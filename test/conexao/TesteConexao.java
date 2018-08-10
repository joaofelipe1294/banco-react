package conexao;

import connection.ConnectionFactory;

public class TesteConexao {
	public static void main(String[] args) {
		try {
			new ConnectionFactory().getConnection();
			System.out.println("Conexão estabelecida !");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
