package dao;

import static org.junit.Assert.assertEquals;

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
	public void teste_cadastro_valido() throws SQLException {
		Cliente cliente = new Cliente();
		cliente.setNome("Jon");
		cliente.setSobrenome("Doe");
		cliente.setRg("009900");
		cliente.setCpf("828292825");
		cliente.setSalario(4900.0);
		dao.cadastra(cliente);
	}
	
	@Test(expected = RuntimeException.class)
	public void teste_cadastro_invalido_rg_e_cpf_duplicados() throws SQLException {
		Cliente cliente = new Cliente();
		cliente.setNome("Jon");
		cliente.setSobrenome("Doe");
		cliente.setRg("009900");
		cliente.setCpf("828292825");
		cliente.setSalario(4900.0);
		dao.cadastra(cliente);
		dao.cadastra(cliente);
	}
	
	@Test(expected = RuntimeException.class)
	public void teste_cadastro_invalido_cpf_duplicado() {
		Cliente cliente1 = new Cliente();
		cliente1.setNome("Jon");
		cliente1.setSobrenome("Doe");
		cliente1.setRg("009900");
		cliente1.setCpf("828292825");
		cliente1.setSalario(4900.0);
		Cliente cliente2 = new Cliente();
		cliente2.setNome("Zé");
		cliente2.setSobrenome("da Silva");
		cliente2.setRg("1234");
		cliente2.setCpf("828292825");
		cliente2.setSalario(1900.0);
		dao.cadastra(cliente1);
		dao.cadastra(cliente2);
	}
	
	@Test(expected = RuntimeException.class)
	public void teste_cadastro_invalido_rg_duplicado() {
		Cliente cliente1 = new Cliente();
		cliente1.setNome("Jon");
		cliente1.setSobrenome("Doe");
		cliente1.setRg("009900");
		cliente1.setCpf("828292825");
		cliente1.setSalario(4900.0);
		Cliente cliente2 = new Cliente();
		cliente2.setNome("Zé");
		cliente2.setSobrenome("da Silva");
		cliente2.setRg("009900");
		cliente2.setCpf("1234");
		cliente2.setSalario(1900.0);
		dao.cadastra(cliente1);
		dao.cadastra(cliente2);
	}
	
	@Test
	public void testa_listagem_de_clientes() {
		Cliente cliente = new Cliente();
		cliente.setNome("Jon");
		cliente.setSobrenome("Doe");
		cliente.setRg("009900");
		cliente.setCpf("828292825");
		cliente.setSalario(4900.0);
		dao.cadastra(cliente);
		assertEquals(1, dao.lista().size());
	}
	
	@Test
	public void testa_edicao_de_cliente() {
		Cliente cliente = new Cliente();
		cliente.setNome("Jon");
		cliente.setSobrenome("Doe");
		cliente.setRg("009900");
		cliente.setCpf("828292825");
		cliente.setSalario(4900.0);
		dao.cadastra(cliente);
		cliente = dao.lista().get(0);
		cliente.setNome("Not Jon Doe");
		dao.edita(cliente);
		assertEquals(cliente.getNome(), dao.lista().get(0).getNome());
	}
	

}
