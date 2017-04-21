using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using dataAccessLayer;

namespace WebApplication1.Controllers
{
    public class serviceAreaController : ApiController
    {

        [System.Web.Http.AcceptVerbs("GET")]
        public List<ServiceArea> Get()
        {
            using (var dbEntities = new MyTask2Entities())
            {
                dbEntities.Configuration.ProxyCreationEnabled = false;
                return dbEntities.ServiceArea.ToList();
            }
        }
    }
}
