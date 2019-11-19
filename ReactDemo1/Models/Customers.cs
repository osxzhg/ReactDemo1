using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ReactDemo1.Models
{
    public partial class Customers
    {
        public Customers()
        {
            Sales = new HashSet<Sales>();
        }

        public int Id { get; set; }

        [Required(ErrorMessage = "Customer Name is required")]
        [StringLength(100, MinimumLength = 3)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Address is required")]
        [StringLength(300)]
        public string Address { get; set; }

        public ICollection<Sales> Sales { get; set; }
    }
}
