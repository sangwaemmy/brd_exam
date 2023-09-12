package com.proc_tender.jwtsecurity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.proc_tender.models.Mdl_account_category;
import com.proc_tender.models.Mdl_comm_notify;
import com.proc_tender.models.Mdl_profile;
import com.proc_tender.models.Mdl_tender_req;
import com.proc_tender.models.Mdl_tender_subm;
import lombok.*;

import javax.persistence.*;

import java.io.Serializable;
import java.util.List;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "account")
public class User implements Serializable {

    //a.id, a.username, a.password, ac.name as catname, p.name, p.surname, a.status 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String username;
    private String password;
    private String email;
    private String status;
    @ManyToOne
    @JoinColumn(name = "account_category_id")
    private Mdl_account_category mdl_account_category;

    @ManyToOne
    @JoinColumn(name = "profile_id")
    private Mdl_profile mdl_profile;

    @OneToMany(mappedBy = "mdl_account", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Mdl_tender_subm> o_tender_subms;

    @OneToMany(mappedBy = "mdl_account", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Mdl_tender_req> o_tender_reqs;

    @OneToMany(mappedBy = "mdl_account", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Mdl_comm_notify> o_comm_notifys;

    public User(String username, String password, String email, Mdl_account_category mdl_account_category, Mdl_profile mdl_profile) {
        this.username = username;
        this.password = password;
        this.email = email; 
        this.mdl_account_category = mdl_account_category;
        this.mdl_profile = mdl_profile;
    }

    public User(String username, String password, String email, String status, Mdl_account_category mdl_account_category, Mdl_profile mdl_profile) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.status = status;
        this.mdl_account_category = mdl_account_category;
        this.mdl_profile = mdl_profile;
    }

}
