package com.cloudbalance.repository;

import com.cloudbalance.entity.OnboardingAccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OnBoardingAccountRepository extends JpaRepository<OnboardingAccountEntity,Long> {
     String findByArn(String arn);
     Optional<OnboardingAccountEntity> findByAccountId(Long accountId);

}

