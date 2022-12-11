package com.eugercek.procrest.data;

import com.eugercek.procrest.data.entity.SnapshotEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SnapshotRepository extends JpaRepository<SnapshotEntity, Integer> {
}
