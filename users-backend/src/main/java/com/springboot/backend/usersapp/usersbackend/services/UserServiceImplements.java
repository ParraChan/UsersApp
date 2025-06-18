package com.springboot.backend.usersapp.usersbackend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.backend.usersapp.usersbackend.entities.User;
import com.springboot.backend.usersapp.usersbackend.repositories.UserRepository;

@Service
public class UserServiceImplements implements UserService {

    private UserRepository repository;

    

    public UserServiceImplements(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> findAll() {
        return (List)this.repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> findById(@NonNull Long id) {
        return this.repository.findById(id);
    }

    @Override
    @Transactional
    public User save(User user) {
        return this.repository.save(user);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
       repository.deleteById(id);
    }

}
