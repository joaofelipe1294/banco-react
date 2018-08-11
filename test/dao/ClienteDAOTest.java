package dao;

import java.sql.Connection;
import java.sql.SQLException;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import connection.ConnectionFactory;
import helpers.LimpaClientesHelper;
import models.Cliente;

public class ClienteDAOTest {
	private Connection connection;
	private ClienteDAO dao;
	
	
	@Before
	public void before() {
		this.connection = new ConnectionFactory().getConnection();
		new LimpaClientesHelper(connection).limpa();
		this.dao = new ClienteDAO(connection);
	}
	
	@After
	public void after() throws SQLException {
		this.connection.rollback();
		this.connection.close();
	}
	
	@Test
	public void test() throws SQLException {
		Cliente cliente = new Cliente();
		cliente.setNome("Jon");
		cliente.setSobrenome("Doe");
		cliente.setRg("009900");
		cliente.setCpf("828292825");
		cliente.setSalario(4900.0);
		dao.cadastra(cliente);
	}

}
