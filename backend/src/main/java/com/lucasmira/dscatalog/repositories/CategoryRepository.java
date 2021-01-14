package com.lucasmira.dscatalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lucasmira.dscatalog.entities.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

}
