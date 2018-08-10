/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package connection;

import java.sql.Connection;
import java.sql.DriverManager;

/**
 *
 * @author joaofelipe
 */
public class ConnectionFactory {
    
    public Connection getConnection(){
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection connection =  DriverManager.getConnection("jdbc:mysql://localhost:3306/api_gerenciador_de_contas" , "root" , "12345678");
            connection.setAutoCommit(false);
            return connection;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException();
        }
        
    }
    
    
}
