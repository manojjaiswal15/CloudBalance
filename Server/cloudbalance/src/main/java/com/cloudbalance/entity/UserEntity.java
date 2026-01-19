package com.cloudbalance.entity;


import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="Users")
public class UserEntity implements UserDetails {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private  String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private  String password;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_"+ role));
    }

    @Override
    public String getUsername() {
        return email;
    }


//    mapping user and account onboarding
@ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
            @JoinTable(name = "user_onboarding_accounts",
                    joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
                    inverseJoinColumns = @JoinColumn(name = "onboarding_account_id", referencedColumnName = "id"))
   private List<OnboardingAccountEntity> onboardingAccountEntities=new ArrayList<>();

}
