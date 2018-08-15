package excecoes;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

public class ValorDuplicadoException extends WebApplicationException{

	public ValorDuplicadoException() {
		super(Response.status(Status.BAD_REQUEST).build());
	}
	
	public ValorDuplicadoException(String message) {
        super(Response.status(Status.BAD_REQUEST).entity(message).type("text/plain").build());
    }
	
}
