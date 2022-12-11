package com.eugercek.procrest.service;

import com.eugercek.procrest.data.entity.ProcessEntity;

import java.util.Set;

public interface ProcessService {
    Set<ProcessEntity> generateCurrent();
}
