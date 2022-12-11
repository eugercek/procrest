package com.eugercek.procrest.service;

import com.eugercek.procrest.data.entity.ProcessEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProcessServiceGenericImpl implements ProcessService {
    public Set<ProcessEntity> generateCurrent() {
        return ProcessHandle
                .allProcesses()
                .map(p -> ProcessEntity.builder()
                        .pid(p.pid())
                        .command(p.info().command().orElse("-"))
                        .argument(String.join(" ", p.info().arguments().orElse(new String[]{"-"})))
                        .start(p.info().startInstant().orElse(Instant.EPOCH))
                        .duration(p.info().totalCpuDuration().orElse(Duration.ZERO))
                        .userName(p.info().user().orElse("-"))
                        .isAlive(p.isAlive())
                        .build())
                .collect(Collectors.toSet());
    }
}