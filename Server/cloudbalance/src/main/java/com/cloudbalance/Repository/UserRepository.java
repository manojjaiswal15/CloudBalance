package com.cloudbalance.Repository;

import com.cloudbalance.Entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    public UserEntity findByEmail(String email);
//    public UserEntity findByRole(String role);

}
