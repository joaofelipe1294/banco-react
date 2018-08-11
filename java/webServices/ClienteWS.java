package webServices;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import models.Cliente;

@Path("cliente")
public class ClienteWS {

	@Context
    private UriInfo context;

	public ClienteWS() {
	}
	
	@POST
	public Response cadastra(Cliente cliente) {
		return Response.ok().build();
	}
	
	@GET
	public Response lista() {
		return Response.ok("Deu boa !").build();
	}
	

	
	
}
