package dao;

import java.sql.Connection;
import java.sql.SQLException;

import org.junit.Test;

import connection.ConnectionFactory;
import models.Cliente;

public class ClienteDAOTest {

	@Test
	public void test() throws SQLException {
		Connection connection = new ConnectionFactory().getConnection();
		Cliente cliente = new Cliente();
		cliente.setNome("Jon");
		cliente.setSobrenome("Doe");
		cliente.setRg("009900");
		cliente.setCpf("828292825");
		cliente.setSalario(4900.0);
		new ClienteDAO(connection).cadastra(cliente);
		connection.commit();
		connection.close();
	}

}
