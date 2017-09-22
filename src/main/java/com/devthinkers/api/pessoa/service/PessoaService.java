package com.devthinkers.api.pessoa.service;

import com.devthinkers.api.pessoa.domain.Pessoa;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PessoaService {

	public List<Pessoa> findAll() {
		List<Pessoa> pessoas = new ArrayList<Pessoa>();

		Pessoa pessoa = new Pessoa();
		pessoa.setNome("Joao");
		pessoa.setId("1");
		pessoa.setCpf("039098883-95");
		pessoas.add(pessoa);

		pessoa = new Pessoa();
		pessoa.setNome("Maria");
		pessoa.setId("2");
		pessoa.setCpf("039098883-95");
		pessoas.add(pessoa);

		return pessoas;
	}

}
