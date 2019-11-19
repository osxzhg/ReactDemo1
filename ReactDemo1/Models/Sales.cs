using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ReactDemo1.Models
{
    public partial class Sales
    {
        public int Id { get; set; }
        [Required]
        public int ProductId { get; set; }
        [Required]
        public int StoreId { get; set; }
        [Required]
        public int CustomerId { get; set; }
        [DataType(DataType.Date)]
        public DateTime DateSold { get; set; }

        public Customers Customer { get; set; }
        public Products Product { get; set; }
        public Stores Store { get; set; }
    }
}
