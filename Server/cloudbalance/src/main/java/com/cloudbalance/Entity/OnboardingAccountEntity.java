package com.cloudbalance.Entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


import java.util.ArrayList;
import java.util.List;


@Entity
@Setter
@Getter
public class OnboardingAccountEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String arn;
    private String accountName;
    private Long accountId;

    @ManyToMany(mappedBy = "onboardingAccountEntities")
    private List<UserEntity> users=new ArrayList<>();;

}
