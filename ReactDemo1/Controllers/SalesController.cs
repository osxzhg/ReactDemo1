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
    public class SalesController : Controller
    {
        private readonly OnbordingContext _context;

        public SalesController(OnbordingContext context)
        {
            _context = context;
        }
        // GET: api/Sales
        [HttpGet("[action]")]
        public IEnumerable<SalesViewModel> Getsales()
        {
            var _sallst = _context.Sales.
                Join(_context.Customers, s => s.CustomerId, c => c.Id,
                (s, c) => new { s.Id, s.DateSold, s.ProductId, s.StoreId, CustomerName = c.Name }
                ).ToList();
            var _joincp = _sallst.
                Join(_context.Products, s => s.ProductId, p => p.Id,
                (s, p) => new { s.Id, s.DateSold, s.CustomerName, s.StoreId, ProductName = p.Name }
                ).ToList();
            var _joincps = _joincp.
                Join(_context.Stores, s => s.StoreId, r => r.Id,
                (s, r) => new SalesViewModel { Id = s.Id, DateSold = s.DateSold.ToString("dd MMM, yyyy"), CustomerName = s.CustomerName, ProductName = s.ProductName, StoreName = r.Name}
                ).ToList();
            return _joincps;
        }
        // GET: api/Sales/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSales([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var sales = await _context.Sales.FindAsync(id);

                if (sales == null)
                {
                    return NotFound();
                }

            var customer = await _context.Customers.FindAsync(sales.CustomerId);
            var product = await _context.Products.FindAsync(sales.ProductId);
            var store = await _context.Stores.FindAsync(sales.StoreId);
            var dateSold = sales.DateSold.ToString("MM/dd/yyyy");
            var saleEntry = new SalesViewModel { Id = sales.Id, DateSold = dateSold, CustomerId=sales.CustomerId,ProductId=sales.ProductId, StoreId=sales.StoreId,
                CustomerName = customer.Name, ProductName = product.Name, StoreName = store.Name };

                return Ok(saleEntry);
        }
        // PUT: api/Sales/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSales([FromRoute] int id, [FromBody] Sales sales)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sales.Id)
            {
                return BadRequest();
            }

            _context.Entry(sales).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalesExists(id))
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

        // POST: api/Sales
        [HttpPost]
        public async Task<IActionResult> PostSales([FromBody] Sales sales)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Sales.Add(sales);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSales", new { id = sales.Id }, sales);
        }

        // DELETE: api/Sales/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSales([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var sales = await _context.Sales.FindAsync(id);
            if (sales == null)
            {
                return NotFound();
            }

            _context.Sales.Remove(sales);
            await _context.SaveChangesAsync();

            return Ok(sales);
        }

        private bool SalesExists(int id)
        {
            return _context.Sales.Any(e => e.Id == id);
        }
    }
}