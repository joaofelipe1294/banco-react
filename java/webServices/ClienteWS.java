package webServices;

import java.sql.Connection;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import com.google.gson.Gson;
import connection.ConnectionFactory;
import dao.ClienteDAO;
import enums.CampoOrdenacao;
import excecoes.ValorDuplicadoException;
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
			throw new ValorDuplicadoException(e.getMessage());
		}
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response lista() {
		try (Connection connection = new ConnectionFactory().getConnection()){
			List<Cliente> listaClientes = new ClienteDAO(connection).lista();
			return Response
					.ok(new Gson().toJson(listaClientes))
					.build();
		} catch (Exception e) {
			return Response.serverError().build();
		}
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response edita(Cliente cliente) {
		try (Connection connection = new ConnectionFactory().getConnection()){
			ClienteDAO clienteDAO = new ClienteDAO(connection);
			clienteDAO.edita(cliente);
			connection.commit();
			List<Cliente> listaClientes = clienteDAO.lista();
			return Response
					.ok(new Gson().toJson(listaClientes))
					.build();
		} catch (Exception e) {
			throw new ValorDuplicadoException(e.getMessage());
		}
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/{ordem}")
	public Response listaClienteOrdenada(@PathParam("ordem") String ordem) {
		try (Connection connection = new ConnectionFactory().getConnection()){
			ClienteDAO clienteDAO = new ClienteDAO(connection);
			List<Cliente> listaClientes;
			if(ordem.equals("nome")) 
				listaClientes = clienteDAO.listaOrdenada(CampoOrdenacao.NOME);
			else if (ordem.equals("sobrenome"))
				listaClientes = clienteDAO.listaOrdenada(CampoOrdenacao.SOBORENOME);
			else if (ordem.equals("salario"))
				listaClientes = clienteDAO.listaOrdenada(CampoOrdenacao.SALARIO);
			else
				return Response.serverError().build();
			return Response
					.ok(new Gson().toJson(listaClientes))
					.build();
		} catch (Exception e) {
			return Response.serverError().build();
		}	
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/busca/nome/{nomeCliente}")
	public Response buscaPorNome(@PathParam("nomeCliente") String nomeCliente) {
		Cliente clienteBusca = new Cliente();
		clienteBusca.setNome(nomeCliente);
		try (Connection connection = new ConnectionFactory().getConnection()){
			ClienteDAO clienteDAO = new ClienteDAO(connection);
			List<Cliente> listaCliente = clienteDAO.buscaPorParteNome(clienteBusca);
			return Response
					.ok(new Gson().toJson(listaCliente))
					.build();
		} catch (Exception e) {
			return Response.serverError().build();
		}
		
	}
	
}
