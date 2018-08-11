package helpers;

import java.sql.Connection;
import java.sql.PreparedStatement;

public class LimpaClientesHelper {
	private Connection connection;

	public LimpaClientesHelper(Connection connection) {
		super();
		this.connection = connection;
	}
	
	public void limpa() {
		String sql = "DELETE FROM clientes;";
		try (PreparedStatement statement = this.connection.prepareStatement(sql)){
			statement.execute();
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException(e.getMessage());
		}
	}
	
	
}
