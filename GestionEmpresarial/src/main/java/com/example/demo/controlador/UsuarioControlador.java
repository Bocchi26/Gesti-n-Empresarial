package com.example.demo.controlador;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.modelo.Usuario;
import com.example.demo.repositorio.UsuarioRepo;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioControlador {
	
	 @Autowired
	 private UsuarioRepo usuarioRepo;

	 @PostMapping("/login")
	 public Object login(@RequestBody Map<String,Object> usuario) {
		 
		 try {
	     // extraemos el valor crudo
	     Object idRaw = usuario.get("idUsuario");

	     // lo convertimos a Long según su tipo real
	     Long idUsuario;
	     if (idRaw instanceof Number) {
	         idUsuario = ((Number) idRaw).longValue();
	     } else {
	         // por ejemplo viene como "123"
	         idUsuario = Long.valueOf(idRaw.toString());
	     }

	     String contrasena = usuario.get("contrasena").toString();

	     // ahora sí podemos buscar sin excepción
	     Usuario usuarioEncontrado = usuarioRepo.findById(idUsuario).orElse(null);
	     if (usuarioEncontrado != null && usuarioEncontrado.getContrasena().equals(contrasena)) {
	         return usuarioEncontrado.getRol();
	     }
	     return null;
		 }catch (Exception e){
			 return null;
		 }
	 }


}


