package com.savaiz.jobs_app.dao;

import com.savaiz.jobs_app.entity.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    Page<Job> findByTitleContaining(@RequestParam("title") String title, Pageable pageable);
    Page<Job> findByDescription(@RequestParam("description") String description, Pageable pageable);

    @Query("SELECT DISTINCT j.title FROM Job j")
    List<String> findAllDistinctRoles();

    @Query("SELECT DISTINCT j.location from Job j")
    List<String> findAllDistinctRegions();
}
