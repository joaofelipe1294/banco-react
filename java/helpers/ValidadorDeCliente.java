package helpers;

import br.com.caelum.stella.validation.CPFValidator;
import br.com.caelum.stella.validation.InvalidStateException;
import models.Cliente;

public class ValidadorDeCliente {
	private Cliente cliente;

	public ValidadorDeCliente(Cliente cliente) {
		this.cliente = cliente;
	}
	
	public void valida() {
		try {
			new CPFValidator().assertValid(cliente.getCpf());
		} catch (InvalidStateException e) {
			throw new RuntimeException("Cpf inválido");
		}
		
	}
	
	
}
