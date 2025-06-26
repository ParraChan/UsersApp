package com.springboot.backend.usersapp.usersbackend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.lang.NonNull;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.backend.usersapp.usersbackend.entities.Role;
import com.springboot.backend.usersapp.usersbackend.entities.User;
import com.springboot.backend.usersapp.usersbackend.models.IUser;
import com.springboot.backend.usersapp.usersbackend.models.UserRequest;
import com.springboot.backend.usersapp.usersbackend.repositories.RoleRepository;
import com.springboot.backend.usersapp.usersbackend.repositories.UserRepository;

@Service
public class UserServiceImplements implements UserService {

    private UserRepository repository;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserServiceImplements(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> findAll() {
        return (List) this.repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<User> findById(@NonNull Long id) {
        return this.repository.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<User> findAll(Pageable pageable) {
        return this.repository.findAll(pageable);
    }

   private void validarDuplicados(User user) {
    if(repository.existsByUsername(user.getUsername())){
        throw new IllegalArgumentException("usuario ya existe");
    }
    if(repository.existsByEmail(user.getEmail())){
        throw new IllegalArgumentException("correo ya existe");
    }
}

        @Override
        @Transactional
        public User save(User user) {
            validarDuplicados(user);
            user.setRoles(getRoles(user));
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            return repository.save(user);
        }

    

   private void validarDuplicadosParaUpdate(UserRequest user, User userDb) {
    if (repository.existsByEmail(user.getEmail()) && !user.getEmail().equals(userDb.getEmail())) {
        throw new IllegalArgumentException("correo ya está registrado");
    }
    if (repository.existsByUsername(user.getUsername()) && !user.getUsername().equals(userDb.getUsername())) {
        throw new IllegalArgumentException("usuario ya está registrado");
    }
    }

        @Override
        @Transactional
        public Optional<User> update(UserRequest user, Long id) {
            return repository.findById(id).map(userDb -> {
                validarDuplicadosParaUpdate(user, userDb);

                userDb.setEmail(user.getEmail());
                userDb.setLastname(user.getLastname());
                userDb.setName(user.getName());
                userDb.setUsername(user.getUsername());
                userDb.setRoles(getRoles(user));

                return repository.save(userDb);
            });
        }

    @Override
    @Transactional
    public void deleteById(Long id) {
        repository.deleteById(id);
    }



    private List<Role> getRoles(IUser user) {
        List<Role> roles = new ArrayList<>();
        Optional<Role> optionalRoleUser = roleRepository.findByName("ROLE_USER");
        // (role::add)
        optionalRoleUser.ifPresent(roles::add);
        if (user.isAdmin()) {
            Optional<Role> optionalRoleAdmin = roleRepository.findByName("ROLE_ADMIN");
            // (role::add)
            optionalRoleAdmin.ifPresent(roles::add);

        }
        return roles;
    }

}
