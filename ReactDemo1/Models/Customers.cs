using System;
using System.Collections.Generic;

namespace ReactDemo1.Models
{
    public partial class Customers
    {
        public Customers()
        {
            Sales = new HashSet<Sales>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }

        public ICollection<Sales> Sales { get; set; }
    }
}
