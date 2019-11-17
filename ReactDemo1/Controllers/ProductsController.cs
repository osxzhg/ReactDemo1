using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactDemo1.Models;

namespace ReactDemo1.Controllers
{
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private readonly OnbordingContext _context;

        public ProductsController(OnbordingContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet("[action]")]
        public IEnumerable<Products> GetProducts()
        {
            return _context.Products;
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProducts([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var customers = await _context.Products.FindAsync(id);

                if (customers == null)
                {
                    return NotFound();
                }

                return Ok(customers);
        }

        // PUT: api/Products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProducts([FromRoute] int id, [FromBody] Products customers)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customers.Id)
            {
                return BadRequest();
            }

            _context.Entry(customers).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Products
        [HttpPost]
        public async Task<IActionResult> PostProducts([FromBody] Products customers)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Products.Add(customers);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProducts", new { id = customers.Id }, customers);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProducts([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var customers = await _context.Products.FindAsync(id);
            if (customers == null)
            {
                return NotFound();
            }

            _context.Products.Remove(customers);
            await _context.SaveChangesAsync();

            return Ok(customers);
        }

        private bool ProductsExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}