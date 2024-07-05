package com.savaiz.jobs_app.dao;

import com.savaiz.jobs_app.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    Subscription findByUserEmail(String userEmail); //finds subscription information per userEmail
}
