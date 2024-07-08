package com.savaiz.jobs_app.service;

import com.savaiz.jobs_app.dao.JobRepository;
import com.savaiz.jobs_app.dao.SubscriptionRepository;
import com.savaiz.jobs_app.entity.Subscription;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SubscriptionService {
    private final SubscriptionRepository subscriptionRepository;
    private final JobRepository jobRepository;

    public SubscriptionService(SubscriptionRepository subscriptionRepository, JobRepository jobRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.jobRepository = jobRepository;
    }

    public Subscription subscribe(String userEmail, List<String> roles, List<String> regions) throws Exception {
        Subscription existingSubscription = subscriptionRepository.findByUserEmail(userEmail);

        if(existingSubscription != null) {
            throw new Exception("User email already subscribed");
        }

        Subscription subscription = new Subscription(userEmail, roles, regions);

        return subscriptionRepository.save(subscription);
    }

    public List<String> getAllRoles() {
        return jobRepository.findAllDistinctRoles();
    }

    public List<String> getAllRegions() {
        return jobRepository.findAllDistinctRegions();
    }
}
