using System;
using System.Collections.Generic;

namespace ReactDemo1.Models
{
    public partial class Products
    {
        public Products()
        {
            Sales = new HashSet<Sales>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }

        public ICollection<Sales> Sales { get; set; }
    }
}
