package com.eugercek.procrest.service;

import com.eugercek.procrest.data.SnapshotRepository;
import com.eugercek.procrest.data.entity.SnapshotEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SnapshotServiceGenericImpl implements SnapshotService {
    private final SnapshotRepository repo;
    private final ProcessService processService;

    @Override
    public List<SnapshotEntity> getAll() {
        return repo.findAll();
    }

    @Override
    public SnapshotEntity getById(int id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Snapshot with %d ID does not exist"));
    }


    @Override
    public SnapshotEntity newSnapshot(String name, String desc) {
        var snapshot = new SnapshotEntity();
        snapshot.setName(name);
        snapshot.setDescription(desc);
        var procs = processService.generateCurrent();

        procs.forEach(p -> p.setSnapshot(snapshot));
        snapshot.setProcs(procs);

        return repo.save(snapshot);
    }

    @Override
    public void deleteSnapshot(int id) {
        repo.deleteById(id);
    }
}