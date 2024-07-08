package com.savaiz.jobs_app.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class SubscriptionRequest {
    private String userEmail;
    private List<String> roles;
    private List<String> regions;
}
