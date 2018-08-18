package dao;

import static org.junit.Assert.assertEquals;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import connection.ConnectionFactory;
import enums.CampoOrdenacao;
import helpers.LimpaClientesHelper;
import models.Cliente;

public class ClienteDAOTest {
	private Connection connection;
	private ClienteDAO dao;
	private Cliente cliente1;
	private Cliente cliente2;
	private Cliente cliente3;
	
	private void montaClientes() {
		this.cliente1 = new Cliente();
		this.cliente1.setNome("Jon");
		this.cliente1.setSobrenome("Doe");
		this.cliente1.setRg("009900");
		this.cliente1.setCpf("828292825");
		this.cliente1.setSalario(4900.0);
		
		this.cliente2 = new Cliente();
		this.cliente2.setNome("Brunilda");
		this.cliente2.setSobrenome("Josefina");
		this.cliente2.setRg("01234");
		this.cliente2.setCpf("08963632");
		this.cliente2.setSalario(2500.0);
		
		this.cliente3 = new Cliente();
		this.cliente3.setNome("Salomão");
		this.cliente3.setSobrenome("O Cão");
		this.cliente3.setRg("6483698");
		this.cliente3.setCpf("112233");
		this.cliente3.setSalario(1850.0);
	}
	
	
	
	@Before
	public void before() {
		this.connection = new ConnectionFactory().getConnection();
		new LimpaClientesHelper(connection).limpa();
		this.dao = new ClienteDAO(connection);
		this.montaClientes();
	}
	
	@After
	public void after() throws SQLException {
		this.connection.rollback();
		this.connection.close();
	}
	
	@Test
	public void teste_cadastro_valido() throws SQLException {
		dao.cadastra(cliente1);
	}
	
	@Test(expected = RuntimeException.class)
	public void teste_cadastro_invalido_rg_e_cpf_duplicados() throws SQLException {
		dao.cadastra(cliente1);
		dao.cadastra(cliente1);
	}
	
	@Test(expected = RuntimeException.class)
	public void teste_cadastro_invalido_cpf_duplicado() throws SQLException {
		cliente1.setCpf("828292825");
		cliente2.setCpf("828292825");
		dao.cadastra(cliente1);
		dao.cadastra(cliente2);
	}
	
	@Test(expected = RuntimeException.class)
	public void teste_cadastro_invalido_rg_duplicado() throws SQLException {
		cliente1.setRg("009900");
		cliente2.setRg("009900");
		dao.cadastra(cliente1);
		dao.cadastra(cliente2);
	}
	
	@Test
	public void testa_listagem_de_clientes() throws SQLException {
		dao.cadastra(cliente1);
		dao.cadastra(cliente2);
		dao.cadastra(cliente3);
		assertEquals(3, dao.lista().size());
	}
	
	@Test
	public void testa_edicao_de_cliente() throws SQLException {
		dao.cadastra(cliente1);
		cliente1 = dao.lista().get(0);
		cliente1.setNome("Not Jon Doe");
		dao.edita(cliente1);
		assertEquals(cliente1.getNome(), dao.lista().get(0).getNome());
	}
	
	@Test
	public void testa_lista_ordenada_nome() throws SQLException {
		dao.cadastra(cliente1);
		dao.cadastra(cliente2);
		dao.cadastra(cliente3);
		List<Cliente> listaClientes = dao.listaOrdenada(CampoOrdenacao.NOME);
		assertEquals("Salomão", listaClientes.get(0).getNome());		
		assertEquals("Jon", listaClientes.get(1).getNome());
		assertEquals("Brunilda", listaClientes.get(2).getNome());

	}
	
	@Test
	public void testa_lista_ordenada_sobrenome() throws SQLException {
		dao.cadastra(cliente1);
		dao.cadastra(cliente2);
		dao.cadastra(cliente3);
		List<Cliente> listaClientes = dao.listaOrdenada(CampoOrdenacao.SOBORENOME);
		assertEquals("Salomão", listaClientes.get(0).getNome());
		assertEquals("Brunilda", listaClientes.get(1).getNome());
		assertEquals("Jon", listaClientes.get(2).getNome());
	}
	
	@Test
	public void testa_lista_ordenada_salario() throws SQLException {
		dao.cadastra(cliente1);
		dao.cadastra(cliente2);
		dao.cadastra(cliente3);
		List<Cliente> listaClientes = dao.listaOrdenada(CampoOrdenacao.SALARIO);
		assertEquals("Jon", listaClientes.get(0).getNome());
		assertEquals("Brunilda", listaClientes.get(1).getNome());
		assertEquals("Salomão", listaClientes.get(2).getNome());
	}
	
	@Test
	public void testa_busca_cliente_por_nome() throws SQLException {
		dao.cadastra(cliente1);
		dao.cadastra(cliente2);
		dao.cadastra(cliente3);
		Cliente clienteBusca = new Cliente();
		clienteBusca.setNome("Jon");
		List<Cliente> listaClientes = dao.buscaPorParteNome(clienteBusca);
		assertEquals(1, listaClientes.size());
	}

	@Test
	public void testa_busca_cliente_por_sobrenome() throws SQLException {
		dao.cadastra(cliente1);
		dao.cadastra(cliente2);
		dao.cadastra(cliente3);
		Cliente clienteBusca = new Cliente();
		clienteBusca.setSobrenome("Doe");
		List<Cliente> listaClientes = dao.buscaPorParteSobrenome(clienteBusca);
		assertEquals(1, listaClientes.size());
	}
	
	@Test
	public void testa_busca_cliente_por_rg() throws SQLException {
		dao.cadastra(cliente1);
		Cliente clienteBanco = dao.buscaClienteRG(cliente1);
		assertEquals(clienteBanco.getNome(), cliente1.getNome());
	}
	
	@Test(expected = RuntimeException.class)
	public void testa_busca_rg_invalido() throws SQLException {
		Cliente cliente = new Cliente();
		cliente.setRg("0123");
		dao.buscaClienteRG(cliente);
	}
	
	@Test
	public void testa_busca_cliente_por_cpf() throws SQLException {
		dao.cadastra(cliente1);
		Cliente clienteBanco = dao.buscaClienteCPF(cliente1);
		assertEquals(clienteBanco.getNome(), cliente1.getNome());
	}
	
	@Test(expected = RuntimeException.class)
	public void testa_busca_cpf_invalido() throws SQLException {
		Cliente cliente = new Cliente();
		cliente.setCpf("0123");
		dao.buscaClienteCPF(cliente);
	}
	
}













