package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.ArrayList;
import java.util.List;

import models.Cliente;

public class ClienteDAO {
	private Connection connection;
	
	public ClienteDAO(Connection connection) {
		this.connection = connection;
	}
 
	public void cadastra(Cliente cliente) throws SQLException {
		String sql = "insert into clientes (nome, sobrenome, rg, cpf, salario) values (?, ?, ?, ?, ?);";
		try (PreparedStatement statement = this.connection.prepareStatement(sql)){
			statement.setString(1, cliente.getNome());
			statement.setString(2, cliente.getSobrenome());
			statement.setString(3, cliente.getRg());
			statement.setString(4, cliente.getCpf());
			statement.setDouble(5, cliente.getSalario());
			statement.execute();
		}catch(SQLIntegrityConstraintViolationException exc) {
			this.connection.rollback();
			if(exc.getMessage().contains("cpf"))
				throw new RuntimeException("CPF duplicado");
			else if(exc.getMessage().contains("rg"))
				throw new RuntimeException("RG duplicado");
		} catch (Exception e) {
			this.connection.rollback();
			e.printStackTrace();
			throw new RuntimeException(e.getMessage());
		}
	}
	
	public List<Cliente> lista() {
		String sql = "SELECT * FROM clientes";
		try (PreparedStatement stmt = this.connection.prepareStatement(sql)){
			try (ResultSet resultSet = stmt.executeQuery()){
				List<Cliente> listaClientes = new ArrayList<>();
				while(resultSet.next()) {
					Cliente cliente = new Cliente();
					cliente.setClienteId(resultSet.getLong("cliente_id"));
					cliente.setNome(resultSet.getString("nome"));
					cliente.setSobrenome(resultSet.getString("sobrenome"));
					cliente.setCpf(resultSet.getString("cpf"));
					cliente.setRg(resultSet.getString("rg"));
					cliente.setSalario(resultSet.getDouble("salario"));
					listaClientes.add(cliente);
				}
				return listaClientes;
			} catch (Exception e) {
				e.printStackTrace();
				throw new RuntimeException();
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException();
		}
	}
	
	public void edita(Cliente cliente) throws SQLException {
		String sql = "UPDATE clientes SET nome = ?, sobrenome = ?, rg = ?, cpf = ?, salario = ? WHERE cliente_id = ?";
		try (PreparedStatement statement = this.connection.prepareStatement(sql)){
			statement.setString(1, cliente.getNome());
			statement.setString(2, cliente.getSobrenome());
			statement.setString(3, cliente.getRg());
			statement.setString(4, cliente.getCpf());
			statement.setDouble(5, cliente.getSalario());
			statement.setLong(6, cliente.getClienteId());
			statement.execute();
		}catch(SQLIntegrityConstraintViolationException exc) {
			this.connection.rollback();
			if(exc.getMessage().contains("cpf"))
				throw new RuntimeException("CPF duplicado");
			else if(exc.getMessage().contains("rg"))
				throw new RuntimeException("RG duplicado");
		} catch (Exception e) {
			this.connection.rollback();
			e.printStackTrace();
			throw new RuntimeException(e.getMessage());
		}
	}
	
}
