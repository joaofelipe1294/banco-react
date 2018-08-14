package webServices;

import java.sql.Connection;
import java.util.List;

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

import connection.ConnectionFactory;
import dao.ClienteDAO;
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
		try (Connection connection = new ConnectionFactory().getConnection()){
			ClienteDAO clienteDAO = new ClienteDAO(connection);
			clienteDAO.cadastra(cliente);
			connection.commit();
			List<Cliente> listaClientes = clienteDAO.lista();
			return Response
					.ok(new Gson().toJson(listaClientes))
					.build();
		} catch (Exception e) {
			return Response
					.serverError()
					.build();
		}
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
