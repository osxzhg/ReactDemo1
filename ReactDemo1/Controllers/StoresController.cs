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
    public class StoresController : Controller
    {
        private readonly OnbordingContext _context;

        public StoresController(OnbordingContext context)
        {
            _context = context;
        }
        // GET: api/Stores
        [HttpGet("[action]")]
        public IEnumerable<Stores> Getstores()
        {
            return _context.Stores;
        }
        // GET: api/Stores/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetStores([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var stores = await _context.Stores.FindAsync(id);

                if (stores == null)
                {
                    return NotFound();
                }

                return Ok(stores);
        }
        // PUT: api/Stores/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStores([FromRoute] int id, [FromBody] Stores stores)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != stores.Id)
            {
                return BadRequest();
            }

            _context.Entry(stores).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StoresExists(id))
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

        // POST: api/Stores
        [HttpPost]
        public async Task<IActionResult> PostStores([FromBody] Stores stores)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Stores.Add(stores);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStores", new { id = stores.Id }, stores);
        }

        // DELETE: api/Stores/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStores([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var stores = await _context.Stores.FindAsync(id);
            if (stores == null)
            {
                return NotFound();
            }

            _context.Stores.Remove(stores);
            await _context.SaveChangesAsync();

            return Ok(stores);
        }

        private bool StoresExists(int id)
        {
            return _context.Stores.Any(e => e.Id == id);
        }
    }
}