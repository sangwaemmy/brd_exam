package com.proc_tender;

import com.proc_tender.jwtsecurity.User;
import com.proc_tender.models.Mdl_account_category;
import com.proc_tender.models.Mdl_criteria;
import com.proc_tender.models.Mdl_criteria_group;
import com.proc_tender.models.Mdl_profile;
import com.proc_tender.models.Mdl_tender_crit_grp;
import com.proc_tender.repository.AccountRepository;
import com.proc_tender.repository.Account_categoryRepository;
import com.proc_tender.repository.CriteriaRepository;
import com.proc_tender.repository.Criteria_groupRepository;
import com.proc_tender.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class Proc_tenderApplication implements CommandLineRunner {

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    ProfileRepository profileRepository;

    @Autowired
    Account_categoryRepository account_categoryRepository;

    @Autowired
    Criteria_groupRepository criteriagroupRepository;

    @Autowired
    CriteriaRepository criteriaRepository;

    public static void main(String[] args) {
        SpringApplication.run(Proc_tenderApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        Mdl_profile mdlLastProfile = new Mdl_profile();
        User mdl_Account = new User();
        if (accountRepository.count() <= 0 || profileRepository.count() <= 0) {
            Mdl_account_category mdl_account_category = new Mdl_account_category();
            mdl_account_category.setName("admin");
            //-------------------USER 1----------------------
            //Save category as admin
            account_categoryRepository.saveAndFlush(mdl_account_category);
            Mdl_account_category mdlLastCategory = account_categoryRepository.findLastcategory();
            profileRepository.saveAndFlush(new Mdl_profile("admin", "admin", "Male"));
            mdlLastProfile = profileRepository.findLastProfile();
            mdl_Account = new User("admin", "123", "admin@gmail.com", mdlLastCategory, mdlLastProfile);
            accountRepository.saveAndFlush(mdl_Account);

            //-------------------USER 2----------------------
            profileRepository.saveAndFlush(new Mdl_profile("user", "user", "Male"));
            mdlLastProfile = profileRepository.findLastProfile();
            account_categoryRepository.saveAndFlush(new Mdl_account_category("user"));
            Mdl_account_category acc2 = account_categoryRepository.findcategoryByName("user");
            mdl_Account = new User("user", "123", "user@gmail.com", acc2, mdlLastProfile);
            accountRepository.saveAndFlush(mdl_Account);

            //-------------------USER 3----------------------
            profileRepository.saveAndFlush(new Mdl_profile("proc_officer", "proc_officer", "Male"));
            mdlLastProfile = profileRepository.findLastProfile();
            account_categoryRepository.saveAndFlush(new Mdl_account_category("proc_officer"));
            Mdl_account_category acc3 = account_categoryRepository.findcategoryByName("proc_officer");
            mdl_Account = new User("proc_officer", "123", "proc_officer@gmail.com", acc3, mdlLastProfile);
            accountRepository.saveAndFlush(mdl_Account);

          

            //-------------------USER 4 THE DEVELOPER ----------------------
            profileRepository.saveAndFlush(new Mdl_profile("vendor", "vendor", "Male"));
            mdlLastProfile = profileRepository.findLastProfile();
            account_categoryRepository.saveAndFlush(new Mdl_account_category("vendor"));
            Mdl_account_category acc5 = account_categoryRepository.findcategoryByName("vendor");
            mdl_Account = new User("vendor", "123", "vendor@gmail.com", acc5, mdlLastProfile);
            accountRepository.saveAndFlush(mdl_Account);

            //---------------Add criteria groups-------------
            Mdl_tender_crit_grp lastCriteriaGroupd1 = new Mdl_tender_crit_grp();
            criteriagroupRepository.saveAndFlush(new Mdl_tender_crit_grp("Qualifications and Experience"));
            lastCriteriaGroupd1 = criteriagroupRepository.findLastcriteriaGroup();
            criteriaRepository.saveAndFlush(new Mdl_criteria("Provide details of previous similar projects and references", lastCriteriaGroupd1));
            criteriaRepository.saveAndFlush(new Mdl_criteria("Specify the required professional certifications or licenses", lastCriteriaGroupd1));
            criteriaRepository.saveAndFlush(new Mdl_criteria("Evaluate the bidder's track record and years of experience in the industry", lastCriteriaGroupd1));

            
            
            
              Mdl_tender_crit_grp lastCriteriaGroupd2 = new Mdl_tender_crit_grp();
            criteriagroupRepository.saveAndFlush(new Mdl_tender_crit_grp("echnical Expertise"));
            lastCriteriaGroupd2 = criteriagroupRepository.findLastcriteriaGroup();
            criteriaRepository.saveAndFlush(new Mdl_criteria("Assess the bidder's technical capabilities to perform the work", lastCriteriaGroupd2));
            criteriaRepository.saveAndFlush(new Mdl_criteria("Evaluate their ability to meet specific technical requirements of the project", lastCriteriaGroupd2));
            

            
              Mdl_tender_crit_grp lastCriteriaGroupd3 = new Mdl_tender_crit_grp();
            criteriagroupRepository.saveAndFlush(new Mdl_tender_crit_grp("inancial Stability"));
            lastCriteriaGroupd3 = criteriagroupRepository.findLastcriteriaGroup();
            criteriaRepository.saveAndFlush(new Mdl_criteria("Request financial statements or credit references to assess their financial stability.", lastCriteriaGroupd3));
            criteriaRepository.saveAndFlush(new Mdl_criteria("Verify if they can handle the project's financial demands.", lastCriteriaGroupd3));
            criteriaRepository.saveAndFlush(new Mdl_criteria("Ensure they have appropriate insurance coverage", lastCriteriaGroupd3));
            
            
            

              Mdl_tender_crit_grp lastCriteriaGroupd4 = new Mdl_tender_crit_grp();
            criteriagroupRepository.saveAndFlush(new Mdl_tender_crit_grp("Compliance with Regulations"));
            lastCriteriaGroupd4 = criteriagroupRepository.findLastcriteriaGroup();
            criteriaRepository.saveAndFlush(new Mdl_criteria("Ensure bidders comply with all relevant laws, regulations, and standards", lastCriteriaGroupd4));
            criteriaRepository.saveAndFlush(new Mdl_criteria("Check if they have a history of legal or regulatory violations", lastCriteriaGroupd4));
            

              Mdl_tender_crit_grp lastCriteriaGroupd6 = new Mdl_tender_crit_grp();
            criteriagroupRepository.saveAndFlush(new Mdl_tender_crit_grp("Quality Assurance"));
            lastCriteriaGroupd6 = criteriagroupRepository.findLastcriteriaGroup();
            criteriaRepository.saveAndFlush(new Mdl_criteria("Inquire about their quality control processes and certifications", lastCriteriaGroupd6));
            criteriaRepository.saveAndFlush(new Mdl_criteria("Evaluate their commitment to delivering high-quality work", lastCriteriaGroupd6));

            
            
              Mdl_tender_crit_grp lastCriteriaGroupd7 = new Mdl_tender_crit_grp();
            criteriagroupRepository.saveAndFlush(new Mdl_tender_crit_grp("Health and Safety"));
            lastCriteriaGroupd7 = criteriagroupRepository.findLastcriteriaGroup();
            criteriaRepository.saveAndFlush(new Mdl_criteria("Assess their safety policies and track record in promoting a safe work environment", lastCriteriaGroupd7));
            criteriaRepository.saveAndFlush(new Mdl_criteria("Verify compliance with health and safety regulations", lastCriteriaGroupd7));

            
            
              Mdl_tender_crit_grp lastCriteriaGroupd8 = new Mdl_tender_crit_grp();
            criteriagroupRepository.saveAndFlush(new Mdl_tender_crit_grp("Environmental Considerations:"));
            lastCriteriaGroupd8 = criteriagroupRepository.findLastcriteriaGroup();
            criteriaRepository.saveAndFlush(new Mdl_criteria("Evaluate their environmental policies and commitment to sustainability", lastCriteriaGroupd8));
            criteriaRepository.saveAndFlush(new Mdl_criteria("Check for any past environmental violations", lastCriteriaGroupd8));
            
            
            
             Mdl_tender_crit_grp lastCriteriaGroupd9 = new Mdl_tender_crit_grp();
            criteriagroupRepository.saveAndFlush(new Mdl_tender_crit_grp("Cost and Pricing"));
            lastCriteriaGroupd9 = criteriagroupRepository.findLastcriteriaGroup();
            criteriaRepository.saveAndFlush(new Mdl_criteria("Compare their proposed costs and pricing structure", lastCriteriaGroupd9));
            criteriaRepository.saveAndFlush(new Mdl_criteria("Ensure they provide a detailed breakdown of costs", lastCriteriaGroupd9));
            criteriaRepository.saveAndFlush(new Mdl_criteria("Assess if the pricing is competitive and within budget", lastCriteriaGroupd9));

            
             Mdl_tender_crit_grp lastCriteriaGroupd10 = new Mdl_tender_crit_grp();
            criteriagroupRepository.saveAndFlush(new Mdl_tender_crit_grp("Project Plan and Timeline"));
            lastCriteriaGroupd10 = criteriagroupRepository.findLastcriteriaGroup();
            criteriaRepository.saveAndFlush(new Mdl_criteria("Evaluate their proposed project plan, timeline, and milestones", lastCriteriaGroupd10));
            criteriaRepository.saveAndFlush(new Mdl_criteria("Assess if they can meet project deadlines", lastCriteriaGroupd10));
            criteriaRepository.saveAndFlush(new Mdl_criteria("Ensure alignment with your project schedule", lastCriteriaGroupd10));

            
            
             Mdl_tender_crit_grp lastCriteriaGroupd11 = new Mdl_tender_crit_grp();
            criteriagroupRepository.saveAndFlush(new Mdl_tender_crit_grp("References and Past Performance"));
            lastCriteriaGroupd11 = criteriagroupRepository.findLastcriteriaGroup();
            criteriaRepository.saveAndFlush(new Mdl_criteria("Contact references provided by the bidder to verify their performance on previous projects", lastCriteriaGroupd11));
            criteriaRepository.saveAndFlush(new Mdl_criteria("Consider their reputation and feedback from past clients", lastCriteriaGroupd11));
            
            

             Mdl_tender_crit_grp lastCriteriaGroupd12 = new Mdl_tender_crit_grp();
            criteriagroupRepository.saveAndFlush(new Mdl_tender_crit_grp("Capacity and Resources"));
            lastCriteriaGroupd12 = criteriagroupRepository.findLastcriteriaGroup();
            criteriaRepository.saveAndFlush(new Mdl_criteria("Determine if they have the necessary workforce and resources to handle the project's scope", lastCriteriaGroupd12));
            criteriaRepository.saveAndFlush(new Mdl_criteria("Evaluate their subcontractor relationships, if applicable", lastCriteriaGroupd12));

            
             Mdl_tender_crit_grp lastCriteriaGroupd13 = new Mdl_tender_crit_grp();
            criteriagroupRepository.saveAndFlush(new Mdl_tender_crit_grp("Communication and Reporting"));
            lastCriteriaGroupd13 = criteriagroupRepository.findLastcriteriaGroup();
            criteriaRepository.saveAndFlush(new Mdl_criteria("Assess their communication skills and responsiveness", lastCriteriaGroupd13));
            criteriaRepository.saveAndFlush(new Mdl_criteria("Evaluate their reporting and documentation processes.", lastCriteriaGroupd13));

            
             Mdl_tender_crit_grp lastCriteriaGroupd14 = new Mdl_tender_crit_grp();
            criteriagroupRepository.saveAndFlush(new Mdl_tender_crit_grp("Conflict of Interest"));
            lastCriteriaGroupd14 = criteriagroupRepository.findLastcriteriaGroup();
            criteriaRepository.saveAndFlush(new Mdl_criteria("Confirm that there are no conflicts of interest that could compromise the project.", lastCriteriaGroupd14));
            
            
             Mdl_tender_crit_grp lastCriteriaGroupd15 = new Mdl_tender_crit_grp();
            criteriagroupRepository.saveAndFlush(new Mdl_tender_crit_grp("Innovation and Value-Added Services"));
            lastCriteriaGroupd15 = criteriagroupRepository.findLastcriteriaGroup();
            criteriaRepository.saveAndFlush(new Mdl_criteria("Encourage bidders to propose innovative solutions or value-added services", lastCriteriaGroupd15));
            criteriaRepository.saveAndFlush(new Mdl_criteria("Evaluate their ability to bring added value to the project", lastCriteriaGroupd15));
            
            
             Mdl_tender_crit_grp lastCriteriaGroupd16 = new Mdl_tender_crit_grp();
            criteriagroupRepository.saveAndFlush(new Mdl_tender_crit_grp("Scalability"));
            lastCriteriaGroupd16 = criteriagroupRepository.findLastcriteriaGroup();
            criteriaRepository.saveAndFlush(new Mdl_criteria("Assess their ability to scale up or down based on project requirements", lastCriteriaGroupd16));

        }
//        THESE BELOW WERE REMOVE AND STARED FROM SCRATCH, SO IT IS COMMENTED OUT

    }
}
