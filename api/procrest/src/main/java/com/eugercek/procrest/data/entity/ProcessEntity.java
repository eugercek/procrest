package com.eugercek.procrest.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.Duration;
import java.time.Instant;

@Entity(name = "process")
@Table(name = "process", schema = "public")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProcessEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private long id;

    private long pid;

    @Column(columnDefinition = "TEXT")
    private String command;

    @Column(columnDefinition = "TEXT")
    private String argument;

    private Instant start;
    private Duration duration;

    private String userName;
    private boolean isAlive;

    @ManyToOne
    @JoinColumn(name = "snapshot_id", nullable = false)
    @JsonIgnore
    private SnapshotEntity snapshot;
}
