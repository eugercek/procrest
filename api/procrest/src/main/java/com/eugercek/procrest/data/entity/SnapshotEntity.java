package com.eugercek.procrest.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity()
@Table(name = "snapshot", schema = "public")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SnapshotEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private int id;

    private String name;

    private String description;

    @OneToMany(mappedBy = "snapshot", fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST}, orphanRemoval = true)
    private Set<ProcessEntity> procs;
}
