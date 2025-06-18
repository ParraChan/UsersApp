package com.springboot.backend.usersapp.usersbackend.repositories;

import org.springframework.data.repository.CrudRepository;

import com.springboot.backend.usersapp.usersbackend.entities.User;

public interface UserRepository extends CrudRepository<User, Long> {

}
