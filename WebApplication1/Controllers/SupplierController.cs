using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using dataAccessLayer;

namespace WebApplication1.Controllers
{
    public class SupplierController : ApiController
    {


        [System.Web.Http.AcceptVerbs("GET")]
        public List<tblSupplier> Get()
        {
            using (var dbEntities = new MyTask2Entities())
            {
                dbEntities.Configuration.ProxyCreationEnabled = false;
                return dbEntities.tblSupplier.ToList();
            }
        }

       
        [System.Web.Http.AcceptVerbs("GET")]
        public ServiceArea Get(string id)
        {
            using (var dbEntities = new MyTask2Entities())
            {
                dbEntities.Configuration.ProxyCreationEnabled = false;
                int SupplierId = Convert.ToInt32(id);
                return dbEntities.ServiceArea.Where(x => x.SupplierId == SupplierId).SingleOrDefault();
            }
        }


        [System.Web.Http.AcceptVerbs("POST")]
        public HttpResponseMessage POST([FromBody] ServiceArea serviceArea)
        {
            using (var dbEntities = new MyTask2Entities())
            {
                dbEntities.Configuration.ProxyCreationEnabled = false;
                bool has = dbEntities.ServiceArea.Any(ser => ser.SupplierId.Value == serviceArea.SupplierId);
                if (has)
                {
                    dbEntities.Configuration.ProxyCreationEnabled = false;
                    int SupplierId = Convert.ToInt32(serviceArea.SupplierId);
                    var bounds = dbEntities.ServiceArea.Where(x => x.SupplierId == SupplierId).SingleOrDefault();
                    bounds.north = serviceArea.north;
                    bounds.south = serviceArea.south;
                    bounds.west = serviceArea.west;
                    bounds.east = serviceArea.east;
                    dbEntities.SaveChanges();
                }
                else
                {
                    dbEntities.ServiceArea.Add(serviceArea);
                    dbEntities.SaveChanges();
                }
            }
            return Request.CreateResponse(HttpStatusCode.OK, serviceArea.ServiceAreaId);
        }


        [Route("api/Supplier/ifSupplierExist/{id}")]
        [System.Web.Http.AcceptVerbs("GET")]
        public bool ifSupplierExist(string id)
        {
            HttpResponseMessage msg = new HttpResponseMessage();
            using (var dbEntities = new MyTask2Entities())
            {
                dbEntities.Configuration.ProxyCreationEnabled = false;
                int SupplierId = Convert.ToInt32(id);
                bool has = dbEntities.ServiceArea.Any(ser => ser.SupplierId.Value == SupplierId);
                if (has)
                {
                    return true;
                }
                else
                    return false;
            }
        }


    }
}
