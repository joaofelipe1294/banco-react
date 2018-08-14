package webServices;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import com.google.gson.Gson;

import models.Cliente;

@Path("cliente")
public class ClienteWS {

	@Context
	private UriInfo context;

	public ClienteWS() {
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response cadastra(Cliente cliente) {
		System.out.println(cliente.getNome());
		String resposta = "DEU BOA";
		return Response
				.ok(new Gson().toJson(resposta))
				.build();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response lista() {
		System.out.println("YO ");
		Cliente cliente = new Cliente();
		cliente.setNome("Nate Diaz");
		return Response
				.ok(new Gson().toJson(cliente))
				.build();
	}

}
