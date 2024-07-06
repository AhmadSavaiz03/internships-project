package com.savaiz.jobs_app.controller;

import com.savaiz.jobs_app.dto.SubscriptionRequest;
import com.savaiz.jobs_app.entity.Subscription;
import com.savaiz.jobs_app.service.SubscriptionService;
import com.savaiz.jobs_app.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:8080") //react can call application without error
@RestController
@RequestMapping("/api/subscribe")
public class SubscriptionController {
    private final SubscriptionService subscriptionService;

    @Autowired
    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @PutMapping("/secure/subscribe")
    public Subscription subscribe(@RequestHeader(value = "Authorization") String token,
                                  @RequestBody SubscriptionRequest subscriptionRequest) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        List<String> roles = subscriptionRequest.getRoles();
        List<String> regions = subscriptionRequest.getRegions();
        return subscriptionService.subscribe(userEmail, roles, regions);
    }
}
