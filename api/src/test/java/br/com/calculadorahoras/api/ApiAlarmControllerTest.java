package br.com.calculadorahoras.api;

import br.com.calculadorahoras.api.controller.Controller;
import br.com.calculadorahoras.api.repo.Repo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.mockito.BDDMockito.*;



@WebMvcTest(Controller.class )
public class ApiAlarmControllerTest {

	@Autowired
    private MockMvc mockMvc;

    @MockBean
    private Repo repo;

    @Test
    public void shouldNotFindConfigById() throws Exception{
        given(repo.findById(0)).willReturn(Optional.empty());

        mockMvc.perform(get("/{id}", 0)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isNotFound());
        }

}