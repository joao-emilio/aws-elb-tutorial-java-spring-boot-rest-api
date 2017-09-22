package com.devthinkers.api.pessoa.controller;

import com.devthinkers.api.pessoa.domain.Pessoa;
import com.devthinkers.api.pessoa.service.PessoaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author joaoemilio
 *
 */

@RestController
@RequestMapping("/api/pessoa")
public class PessoaRESTController {

	private static final Logger log = LoggerFactory.getLogger(PessoaRESTController.class);

	@Autowired
	private PessoaService service;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public List<Pessoa> findAll() {
		log.debug("FindAll Pessoa");
		List<Pessoa> pessoas = service.findAll();
		return pessoas;
	}

}
