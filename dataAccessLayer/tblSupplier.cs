//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace dataAccessLayer
{
    using System;
    using System.Collections.Generic;
    
    public partial class tblSupplier
    {
        public tblSupplier()
        {
            this.ServiceArea = new HashSet<ServiceArea>();
        }
    
        public int SupplierId { get; set; }
        public string Name { get; set; }
    
        public virtual ICollection<ServiceArea> ServiceArea { get; set; }
    }
}
