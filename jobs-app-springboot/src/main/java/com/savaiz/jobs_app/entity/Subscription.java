package com.savaiz.jobs_app.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "subscriptions")
@Data
public class Subscription {
    public Subscription() {}

    public Subscription(String userEmail, List<String> roles, List<String> regions) {
        this.userEmail = userEmail;
        this.roles = roles;
        this.regions = regions;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_email")
    private String userEmail;

    @ElementCollection
    @CollectionTable(name = "subscription_roles", joinColumns = @JoinColumn(name = "subscription_id"))
    @Column(name = "roles")
    private List<String> roles;

    @ElementCollection
    @CollectionTable(name = "subscription_regions", joinColumns = @JoinColumn(name = "subscription_id"))
    @Column(name = "regions")
    private List<String> regions;
}
