package com.eugercek.procrest.service;

import com.eugercek.procrest.data.entity.SnapshotEntity;

import java.util.List;

public interface SnapshotService {
    List<SnapshotEntity> getAll();

    SnapshotEntity getById(int id);

    SnapshotEntity newSnapshot(String name, String desc);

    void deleteSnapshot(int id);
}
