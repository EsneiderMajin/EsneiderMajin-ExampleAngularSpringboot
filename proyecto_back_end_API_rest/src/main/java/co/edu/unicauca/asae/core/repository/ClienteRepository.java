

package co.edu.unicauca.asae.core.repository;

import co.edu.unicauca.asae.core.modelo.Region;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import co.edu.unicauca.asae.core.modelo.Cliente;


public interface ClienteRepository extends CrudRepository<Cliente, Integer>{

    @Query("from Region")
    public Iterable<Region> findAllRegiones();

}
