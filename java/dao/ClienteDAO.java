package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;

import models.Cliente;

public class ClienteDAO {
	private Connection connection;
	
	public ClienteDAO(Connection connection) {
		this.connection = connection;
	}
 
	public void cadastra(Cliente cliente) {
		String sql = "insert into clientes (nome, sobrenome, rg, cpf, salario) values (?, ?, ?, ?, ?);";
		try (PreparedStatement statement = this.connection.prepareStatement(sql)){
			statement.setString(1, cliente.getNome());
			statement.setString(2, cliente.getSobrenome());
			statement.setString(3, cliente.getRg());
			statement.setString(4, cliente.getCpf());
			statement.setDouble(5, cliente.getSalario());
			statement.execute();
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e.getMessage());
		}
	}
	
}
