package com.springboot.backend.usersapp.usersbackend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import  static jakarta.persistence.GenerationType.*;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.springboot.backend.usersapp.usersbackend.models.IUser;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "users", uniqueConstraints = {
    @UniqueConstraint(columnNames = "username"),
    @UniqueConstraint(columnNames = "correo")
})
public class User implements IUser {


    //@NotNull para numeros , etc @NotBlank para no tener espacios en blanco

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @NotEmpty(message = "El nombre es obligatorio")
    private String name;

    @NotEmpty(message = "El apellido es obligatorio")
    @Column(name = "lastname")
    private String lastname;
    
    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "El correo debe ser válido", regexp ="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}",flags = Pattern.Flag.CASE_INSENSITIVE )
    private String email;
    
    @NotBlank(message = "El nombre de usuario es obligatorio")
    @Size(min = 8, max = 20, message = "El nombre de usuario debe tener entre 8 y 20 caracteres")
    private String username;

    @Transient
    //@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private boolean admin;
    
    @NotBlank(message = "la contraseña es obligatoria")
    private String password;

    @JsonIgnoreProperties({"handler", "hibernateLazyInitializer"})
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name="users_roles",
        joinColumns = {@JoinColumn(name="user_id")},
        inverseJoinColumns = @JoinColumn(name="role_id"),
        uniqueConstraints = { @UniqueConstraint(columnNames = {"user_id", "role_id"})}
    )
    private List<Role> roles;


    public User() {
        this.roles = new ArrayList<>();
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getLastname() {
        return lastname;
    }
    public void setLastname(String lastname) {
        this.lastname = lastname;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public List<Role> getRoles() {
        return roles;
    }
    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }
    public boolean isAdmin() {
        return admin;
    }
    public void setAdmin(boolean admin) {
        this.admin = admin;
    }
    

    

}
