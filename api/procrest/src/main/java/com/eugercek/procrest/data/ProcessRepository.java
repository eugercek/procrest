package com.eugercek.procrest.data;

import com.eugercek.procrest.data.entity.ProcessEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcessRepository extends JpaRepository<ProcessEntity, Long> {
}
